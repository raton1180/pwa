import React, { useEffect, useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Input,
    Spinner,
} from "@material-tailwind/react";
import natureInstance from '../axios/natureInstance';

const Home = () => {
    const [images, setImages] = useState([])
    const [searchValue, setSearchValue] = useState("nature")
    const searchImage = (value) => {
        setSearchValue(value)
    }
    const [imageErrors, setImageErrors] = useState(Array(images.length).fill(false));

    useEffect(() => {
        natureInstance.get(`/search?q=${searchValue}`)
            .then(response => {
                setImages(response?.data?.images);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [searchValue])

    const handleImageError = (index) => {
        const newErrors = [...imageErrors];
        newErrors[index] = true;
        setImageErrors(newErrors);
    };

    return (
        <>
            <div className="container mx-auto">
                <div className="w-2/4 mx-auto my-5">
                    <Input label="Search nature images" onChange={(e) => searchImage(e.target.value)} />
                </div>
                {images.length === 0 && <Spinner className="h-16 w-16 text-gray-900/50 my-5 mx-auto flex justify-center" />}
                <div className="grid md:grid-cols-3 gap-4">
                    {images?.map((post, idx) => (
                        !imageErrors[idx] && ( 
                            <Card className="mt-6 md:w-full mx-4" key={idx}>
                                <img
                                    src={post?.image}
                                    alt="card-image"
                                    className="h-96 w-full object-cover object-center rounded"
                                    onError={() => handleImageError(idx)}
                                />
                            </Card>
                        )
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home