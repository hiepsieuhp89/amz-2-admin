import {
  Box,
  Dialog,
  DialogContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useGetMessages, useSendMessage, useMarkAsRead, useDeleteMessage } from "@/hooks/admin-chat";
import { useState, useEffect, useRef } from "react";
import { IconSearch, IconCheck, IconTrash } from "@tabler/icons-react";
import { toast } from "react-toastify";

interface ChatDialogProps {
  open: boolean;
  onClose: () => void;
  userId: string | null;
  allUsers: any[];
  shop: any;
}

export default function ChatDialog({
  open,
  onClose,
  userId: selectedShopId,
  allUsers,
  shop,
}: ChatDialogProps) {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const previousMessagesCount = useRef(0);

  const { data: messages, isLoading, refetch } = useGetMessages(
    selectedUserId || "",
    selectedShopId || ""
  );
  const sendMessageMutation = useSendMessage();
  const markAsReadMutation = useMarkAsRead();
  const deleteMessageMutation = useDeleteMessage();

  // Thêm interval để fetch tin nhắn mới
  useEffect(() => {
    if (!open || !selectedUserId || !selectedShopId) return;

    const interval = setInterval(() => {
      refetch();
    }, 20000); // 20 giây

    return () => clearInterval(interval);
  }, [open, selectedUserId, selectedShopId]);

  // Kiểm tra tin nhắn mới và hiển thị thông báo
  useEffect(() => {
    if (!messages?.data || isLoading) return;

    const currentMessagesCount = messages.data.length;
    if (previousMessagesCount.current > 0 && 
        currentMessagesCount > previousMessagesCount.current) {
      const newMessagesCount = currentMessagesCount - previousMessagesCount.current;
      toast.info(`Bạn có ${newMessagesCount} tin nhắn mới`);
    }

    previousMessagesCount.current = currentMessagesCount;
  }, [messages, isLoading]);

  // Filter users based on search term
  const filteredUsers = allUsers.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.email.toLowerCase().includes(searchLower) ||
      user.phone?.toLowerCase().includes(searchLower) ||
      user.invitationCode?.toLowerCase().includes(searchLower) ||
      user.referralCode?.toLowerCase().includes(searchLower) ||
      [user.address, user.ward, user.district, user.city]
        .filter(Boolean)
        .join(", ")
        .toLowerCase()
        .includes(searchLower)
    );
  });

  const handleSendMessage = async () => {
    if (!selectedUserId || !selectedShopId || !message) return;

    try {
      await sendMessageMutation.mutateAsync({
        userId: selectedUserId,
        shopId: selectedShopId,
        message,
      });
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleMarkAsRead = async (messageId: string) => {
    try {
      await markAsReadMutation.mutateAsync(messageId);
      // Optionally refresh messages
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await deleteMessageMutation.mutateAsync(messageId);
      // Optionally refresh messages
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogContent>
        <Box display="flex" height="600px">
          {/* Sidebar */}
          <Box
            width="300px"
            borderRight="1px solid #e0e0e0"
            display="flex"
            flexDirection="column"
          >
            <Box p={2}>
              <Typography variant="h6" mb={2}>
                Chọn người dùng
              </Typography>
              <TextField
                size="small"
                fullWidth
                placeholder="Tìm theo email, SĐT, mã, địa chỉ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch size={20} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box flex={1} overflow="auto">
              <List>
                {filteredUsers.map((user) => (
                  <ListItem key={user.id} disablePadding>
                    <ListItemButton
                      selected={selectedUserId === user.id}
                      onClick={() => {
                        setSelectedUserId(user.id);
                      }}
                    >
                      <ListItemText
                        primary={user.fullName || user.username}
                        secondary={
                          <Box component="span" display="block">
                            <Box component="span" display="block">
                              {user.email}
                            </Box>
                            <Box component="span" display="block">
                              {user.phone}
                            </Box>
                            <Box component="span" display="block">
                              {[
                                user.address,
                                user.ward,
                                user.district,
                                user.city,
                              ]
                                .filter(Boolean)
                                .join(", ")}
                            </Box>
                          </Box>
                        }
                        secondaryTypographyProps={{ component: "div" }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>

          {/* Chat Area */}
          <Box flex={1} display="flex" flexDirection="column">
            {/* Chat Header */}
            <Box p={2} borderBottom="1px solid #e0e0e0">
              <Typography variant="h6">
                Gửi tin nhắn từ{" "}
                {selectedUserId
                  ? allUsers.find((u) => u.id === selectedUserId)?.fullName ||
                    "người dùng"
                  : "..."}{" "}
                đến {shop?.shopName || "shop"}
              </Typography>
            </Box>

            {/* Messages */}
            <Box flex={1} p={2} overflow="auto">
              {isLoading ? (
                <Typography>Đang tải tin nhắn...</Typography>
              ) : (
                messages?.data?.map((msg: any, index: number) => {
                  const isUserMessage = msg.senderRole === "user";
                  const senderInfo = isUserMessage
                    ? msg.user?.fullName || "Người dùng"
                    : msg.shop?.shopName || "Shop";

                  return (
                    <Box
                      key={msg.id}
                      mb={2}
                      className={isUserMessage ? "ml-auto" : ""}
                      style={{ 
                        maxWidth: msg.message.length > 50 ? "70%" : "fit-content" 
                      }}
                    >
                      <Box
                        bgcolor={isUserMessage ? "#e3f2fd" : "#f5f5f5"}
                        p={1.5}
                        borderRadius={2}
                      >
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography variant="caption" color="textSecondary" display="block" mb={0.5}>
                            {senderInfo}
                          </Typography>
                          <Box display="flex" gap={1}>
                            <IconCheck
                              size={20}
                              style={{ cursor: "pointer", color: "#4caf50" }}
                              onClick={() => handleMarkAsRead(msg.id)}
                            />
                            <IconTrash
                              size={20}
                              style={{ cursor: "pointer", color: "#f44336" }}
                              onClick={() => handleDeleteMessage(msg.id)}
                            />
                          </Box>
                        </Box>
                        <Typography>{msg.message}</Typography>
                        <Typography variant="caption" color="textSecondary" display="block" mt={0.5}>
                          {new Date(msg.createdAt).toLocaleTimeString()}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })
              )}
            </Box>

            {/* Message Input */}
            <Box p={2} borderTop="1px solid #e0e0e0">
              <Box display="flex" gap={1}>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập tin nhắn..."
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    border: "1px solid #e0e0e0",
                    borderRadius: "4px",
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#1976d2",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Gửi
                </button>
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
