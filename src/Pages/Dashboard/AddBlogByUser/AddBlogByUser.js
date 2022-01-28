import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import PendingRequest from "../PendingRequest/PendingRequest";
const AddBlogByUser = () => {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [travelerInfo, setTravelerInfo] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");

    const [image, setImage] = useState(null);
    const [flag, setFlag] = useState(true);
    const [clicked, setClicked] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault();
        setClicked(true)

        if (!image) {
            return;
        }


        // save user to the database
        const formData = new FormData();
        formData.append("name", name);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("travelerInfo", travelerInfo);
        formData.append("price", price);
        formData.append("location", location);

        formData.append("image", image);

        formData.append("category", category);

        const api = "https://travel-blog-661cb.web.app/addblogbyuser";

        fetch(api, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    console.log(data);
                    console.log("data insert Successfull");
                    setClicked(false)
                    if (flag) {
                        setFlag(false)
                    }
                    else {
                        setFlag(true)
                    }
                }

            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div>
            <h1 className="my-3 text-center" >
                Add your Blog
            </h1>
            <form onSubmit={handleSubmit}>

                <Form.Label>Name</Form.Label>
                <input
                    label="Name"
                    required
                    onChange={(e) => setName(e.target.value)}
                    variant="standard"
                />
                <Form.Label>Title</Form.Label>
                <input
                    label="Title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    variant="standard"
                />
                <Form.Label>Location</Form.Label>
                <input
                    label="Location"
                    required
                    onChange={(e) => setLocation(e.target.value)}
                    variant="standard"
                />
                <Form.Label>Traveler Info</Form.Label>
                <input
                    label="Traveler Info"
                    required
                    onChange={(e) => setTravelerInfo(e.target.value)}
                    variant="standard"
                />


                <Form.Label>Travel Cost</Form.Label>
                <input
                    required
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                />

                <Form.Label>Description</Form.Label>
                <input
                    required
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                />


                <div className="my-2">
                    <Form.Label>Category: </Form.Label>
                    <input
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        style={{}}
                    >
                    </input>

                </div>


                <Form.Label>Profile Picture</Form.Label>
                <input
                    accept="image/*"
                    type="file"
                    required
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <br />


                <Button variant="outlined" type="submit" disabled={clicked}>
                    {clicked ? "Adding Blog" : "Add Blog"}
                </Button>

            </form>
            <PendingRequest flags={flag}></PendingRequest>
        </div>
    );
};

export default AddBlogByUser;
