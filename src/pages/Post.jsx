import React, { useCallback, useEffect, useState } from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import instance from '../axios/instance';
import AddPost from '../components/AddPost';
import backendPost from '../axios/backendPost';


const Post = () => {
    const [posts, setPosts] = useState([])
    const [title, setTitle] = useState("")
    const [details, setDetails] = useState("")
    const [isUpdate, setIsUpdate] = useState(false)
    const [postData, setPostData] = useState(null)
    const [addPost, setAddPost] = useState(false)


    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = useCallback(
        () => {
            instance.get('/posts')
                .then(response => {
                    setPosts(response.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
        [],
    )

    const handleSubmit = () => {

        if (title !== "" && details !== "") {
            {
                const data = {
                    title,
                    body: details,
                    userId: 1,
                }
                backendPost.post('/post', data)
                    .then(response => {
                        console.log("🚀 ~ file: Post.jsx:46 ~ handleSubmit ~ response:", response)
                        setDetails("")
                        setTitle("")
                        fetchPosts()
                    })
                    .catch(error => {
                        console.log("🚀 ~ file: Post.jsx:54 ~ handleSubmit ~ error:", error)
                        // if ('serviceWorker' in navigator && 'SyncManager' in window) {
                        //     navigator.serviceWorker.ready.then((registration) => {
                        //       return registration.sync.register('post-queue');
                        //     });
                        //   }
                    });
            }
        }
        setDetails("")
        setTitle("")
    }

    const handleEdit = (id) => {
        if (id) {
            setIsUpdate(true);
            instance.get(`/posts/${id}`)
                .then(response => {
                    const data = response?.data
                    setPostData(data)
                    setTitle(data?.title);
                    setDetails(data?.body);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            setIsUpdate(false);
            setDetails("")
            setTitle("")
        }

    }

    const updateData = () => {

        if (title !== "" && details !== "") {
            const data = {
                title,
                body: details,
                userId: 1,
                id: postData?.id
            }
            instance.put(`/posts/${data?.id}`, data)
                .then(response => {
                    console.log("🚀 ~ file: Post.jsx:91 ~ updateData ~ response:", response)
                    fetchPosts()
                    setIsUpdate(false);
                    setDetails("")
                    setTitle("")
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }

    return (
        <>
            <div className="container mx-auto">
                <div className='flex justify-center mx-auto my-5'>
                    <div>
                        <Button onClick={() => setAddPost(!addPost)} className='block'>Add Post</Button>
                        {addPost && <AddPost
                            setTitle={setTitle}
                            title={title}
                            details={details}
                            setDetails={setDetails}
                            handleSubmit={handleSubmit}
                            handleEdit={handleEdit}
                            updateData={updateData}
                            isUpdate={isUpdate}
                        />}
                    </div>

                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    {posts?.map((post, idx) => (
                        <Card className="mt-6 md:w-96 mx-3" key={idx}>
                            <CardBody>
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    {post?.title}
                                </Typography>
                                <Typography>
                                    {post?.body.slice(0, 150)}
                                </Typography>
                            </CardBody>
                            <CardFooter className="pt-0 md:flex justify-between">
                                <Button>Read More</Button>
                                <button
                                    onClick={() => handleEdit(post?.id)}
                                    className="select-none rounded-lg bg-amber-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-amber-500/20 transition-all hover:shadow-lg hover:shadow-amber-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                >
                                    Edit
                                </button>
                            </CardFooter>
                        </Card>
                    ))
                    }
                </div>
            </div>
        </>
    )
}

export default Post