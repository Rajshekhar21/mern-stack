import React, { useState, useEffect } from "react";
import Input from "@mui/joy/Input";
import {
  Box,
  Button,
  Card,
  CardContent,
  Drawer,
  FormLabel,
  Typography,
} from "@mui/joy";
import BottomNav from "../components/Footer";
import Breadcrumb from "../components/BreadCumb";
import axios from "axios";

const CrudPage = () => {
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        setItems(response.data.data.posts);
        console.log(response.data.data.posts);
      } catch (error) {
        console.error("Error fetching items:", error.message);
      }
    };

    fetchItems();
  }, []);

  const handleAddItem = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/posts", {
        title: titleInput,
        body: bodyInput || "Default body",
      });
      setItems([...items, response.data.data.post]);
      setDrawerOpen(false);
      setTitleInput("");
      setBodyInput("");
    } catch (error) {
      console.error("Error adding item:", error.message);
    }
  };

  const handleEditItem = (item) => {
    setTitleInput(item.title);
    setBodyInput(item.body);
    setEditId(item.postId);
    setIsEditing(true);
    setDrawerOpen(true);
  };

  const handleUpdateItem = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/posts/${editId}`,
        {
          title: titleInput,
          body: bodyInput,
        }
      );
      console.log("Update response:", response);
      setItems(
        items.map((item) =>
          item.postId === editId
            ? { ...item, title: response.data.data.post.title }
            : item
        )
      );
    } catch (error) {
      console.error("Error updating item:", error.message);
    }
    setTitleInput("");
    setBodyInput("");
    setDrawerOpen(false);
    setEditId("");
  };

  const handleDeleteItem = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`);
      setItems(items.filter((item) => item.postId !== postId));
    } catch (error) {
      console.error("Error deleting item:", error.message);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "background.surface",
        minHeight: "90vh",
        pb: 10,
      }}
    >
      <Breadcrumb title="CRUD" navigation={true} />
      <Box
        component="main"
        className="MainContent"
        sx={{
          px: { xs: 2, md: 6 },
          pb: { xs: 2, sm: 2, md: 3 },
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: 0,
        }}
      >
        <Box className="mb-4 flex w-full">
          <Button onClick={() => setDrawerOpen(true)}> Create new post </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          {items &&
            items.map((post, i) => (
              <Card key={post.postId}>
                <CardContent>
                  <Typography variant="h6">{post.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.body}
                  </Typography>
                  <Box mt={2} display="flex" justifyContent="space-between">
                    <Button
                      variant="outlined"
                      onClick={() => handleEditItem(post)}
                    >
                      Edit
                    </Button>
                    <Button
                      color="danger"
                      variant="outlined"
                      onClick={() => handleDeleteItem(post.postId)}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
        </Box>
      </Box>

      <Drawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          p={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography level="h4"> Enter Details and add post </Typography>
          <FormLabel>Post Title</FormLabel>
          <Input
            label="Title"
            variant="outlined"
            fullWidth
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
          />
          <FormLabel>Post Description</FormLabel>
          <Input
            label="Body"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={bodyInput}
            onChange={(e) => setBodyInput(e.target.value)}
          />
          {isEditing ? (
            <Button onClick={handleUpdateItem} sx={{ mt: 1 }}>
              Update
            </Button>
          ) : (
            <Button onClick={handleAddItem} sx={{ mt: 1 }}>
              Create
            </Button>
          )}
        </Box>
      </Drawer>

      <BottomNav />
    </Box>
  );
};

export default CrudPage;
