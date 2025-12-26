"use client"

import { useState, useEffect } from "react"
import { Search, Phone, Mail, Calendar, CreditCard, RefreshCw, Wallet, Trash2, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { adminApi, AdminUser } from "@/lib/admin-api"
import { useToast } from "@/hooks/use-toast"

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState<string | null>(null) // ✅ For delete loading
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { toast } = useToast()

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await adminApi.getUsers({
        search: searchTerm,
        status: filterStatus,
        page: currentPage,
        limit: 20,
      })

      if (response && response.success) {
        setUsers(response.data.users)
        setTotalPages(response.data.pagination.totalPages)
      } else {
        setUsers([])
        setTotalPages(1)
        toast({
          title: "Failed",
          description: "Could not load users.",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      console.error("Error fetching users:", error)
      setUsers([])
      setTotalPages(1)
      toast({
        title: "Error",
        description: error.message || "Failed to load users.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [currentPage, filterStatus])

  const handleSearch = () => {
    setCurrentPage(1)
    fetchUsers()
  }

  // ✅ New: Delete Logic without breaking anything
  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!confirm(`Are you sure you want to permanently delete ${userName}? This will remove all their records.`)) {
      return
    }

    try {
      setIsDeleting(userId)
      await adminApi.deleteUser(userId)
      
      // UI se turant hata do bina refresh kiye
      setUsers((prev) => prev.filter((user) => user.id !== userId))
      
      toast({
        title: "User Deleted",
        description: `${userName} has been removed successfully.`,
      })
    } catch (error: any) {
      toast({
        title: "Delete Failed",
        description: error.message || "Could not delete user.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  const getStatusBadge = (status: AdminUser["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "expired":
        return <Badge variant="destructive">Expired</Badge>
      case "expiring":
        return <Badge className="bg-yellow-500">Expiring Soon</Badge>
      default:
        return <Badge variant="secondary">No Plan</Badge>
    }
  }

  const generateWhatsAppMessage = (user: AdminUser) => {
    const message = encodeURIComponent(`Hello ${user.name}, please renew your subscription.`)
    return `https://wa.me/${user.phone.replace(/[^0-9]/g, "")}?text=${message}`
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls - Same as yours */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex gap-2">
          <Input
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={loading}>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
        <div className="flex gap-2">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expiring">Expiring Soon</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={fetchUsers} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User Details</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Current Plan</TableHead>
              <TableHead>Total Paid</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={8} className="text-center py-8">Loading users...</TableCell></TableRow>
            ) : users.length === 0 ? (
              <TableRow><TableCell colSpan={8} className="text-center py-8">No users found</TableCell></TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </TableCell>
                  <TableCell className="text-sm">{user.phone}</TableCell>
                  <TableCell><Badge variant="outline">{user.plan}</Badge></TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell className="text-xs">
                    {user.startDate ? `${new Date(user.startDate).toLocaleDateString()} - ${new Date(user.endDate!).toLocaleDateString()}` : "-"}
                  </TableCell>
                  <TableCell className="text-sm">{formatCurrency(user.currentPlanAmount)}</TableCell>
                  <TableCell className="text-sm font-semibold text-green-600">{formatCurrency(user.totalPaid)}</TableCell>
                  
                  {/* ✅ Actions column with both WhatsApp and Delete */}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        title="WhatsApp"
                        onClick={() => window.open(generateWhatsAppMessage(user), "_blank")}
                      >
                        <Phone className="h-4 w-4 text-green-600" />
                      </Button>
                      
                      <Button
                        size="icon"
                        variant="destructive"
                        title="Delete User"
                        disabled={isDeleting === user.id}
                        onClick={() => handleDeleteUser(user.id, user.name)}
                      >
                        {isDeleting === user.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination - EXACTLY the same as your logic */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1 || loading}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || loading}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}