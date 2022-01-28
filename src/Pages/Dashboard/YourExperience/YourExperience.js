import axios from 'axios';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';

const YourExperience = () => {
    const { user } = useAuth()
    const [reviewFlag, setReviewFlag] = useState(false)
    const [isFeedback, setIsFeedback] = useState(false)
    const {
        register: register2,
        handleSubmit: handleSubmit2,
        reset: reset2,
        formState: { errors: errors2 },
    } = useForm();
    const onFeedbackSubmit = (data) => {
        setIsFeedback(true)
        console.log(data)
        const api = "https://travel-blog-661cb.web.app/yourexperience"
        axios
            .post(api, data)
            .then((res) => {
                // console.log(res);
                if (res.data.insertedId) {
                    reset2();
                    console.log("Thank you for your valuable Feedback")
                    setReviewFlag(!reviewFlag)
                    setIsFeedback(false)

                }
            });
    }
    return (
        <form
            className="appointment-form  rounded "
            onSubmit={handleSubmit2(onFeedbackSubmit)}
        >


            {/* <Form.Label>Your Name</Form.Label> */}
            <input readOnly type="hidden" defaultValue={user.displayName} {...register2("name")} />
            {/* <Form.Label>Your Email</Form.Label> */}
            <input
                type="hidden"
                defaultValue={user.email}
                {...register2("email", { required: true })}
                readOnly
            />
            {errors2.email && (
                <span className="error">This field is required</span>
            )}

            <Form.Label>Your Rating</Form.Label>
            <input
                type="number"
                placeholder="Rating"
                defaultValue=""
                min="1" max="5"
                {...register2("rating", { required: true, maxLength: 1 })}
            />
            {errors2.rating && (
                <div><span className="error ">Rating is required</span><br /></div>
            )}
            {errors2.rating && errors2.rating.type === "maxLength" && (
                <div><span className="error">Rating Should be between 1 to 5</span><br /></div>
            )}

            <Form.Label>Comment</Form.Label>
            <textarea
                className='w-100'
                rows="4"
                placeholder="Comment"
                defaultValue=""
                {...register2("comment", { required: true, maxLength: 50 })}
            />
            {errors2.comment && (
                <span className="error "> Comment is required</span>
            )}
            {errors2.comment && errors2.comment.type === "maxLength" && (
                <div><span className="error">feedback Comment should be in 30 characters</span><br /></div>
            )}

            <input
                type="submit"
                // onClick={notify}
                className="btn btn-outline-info"
                disabled={isFeedback}
                value={isFeedback ? "Loading, Please wait.." : "Give Feedback"}
            />
        </form>
    );
};

export default YourExperience;