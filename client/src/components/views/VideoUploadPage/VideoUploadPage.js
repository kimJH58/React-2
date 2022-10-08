import React, { useState } from 'react'
import{ Typography, Button, Form, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import {useSelector} from 'react-redux';


const {TextArea} = Input;
const { Title } = Typography;

const privateOptions = [
    {value:0, label:"Private"},
    {value:1, label:"Public"}
]

const categoryOptions = [
    {value:0, label:'Film & Animation'},
    {value:1, label:'Autos & Vehicles'},
    {value:2, label:'Music'},
    {value:3, label:'Pets & Animals'}
]

function VideoUploadPage() {

    const [videoTitle, setvideoTitle] = useState("")
    const [description, setdescription] = useState("")
    const [Private, setPrivate] = useState(0);
    const [category, setcategory] = useState("Film & Animation");
    const [filePath, setfilePath] = useState("")

    const onTitleChange = (e) =>{
        setvideoTitle(e.currentTarget.value)
    }
    const onDescriptionChange = (e) =>{
        setdescription(e.currentTarget.value)
    }
    const onPrivateChange=(e)=>{
        setPrivate(e.currentTarget.value)
    }
    const onCategoryChange = (e) =>{
        setcategory(e.currentTarget.value)
    }

    const onDrop = (files) =>{
        let formData = new FormData;
        const config = {
            header:{'content-type' : 'multipart/form-data'}
        }
        formData.append("file", files[0]);
        axios.post('/api/video/uploadfiles', formData, config)
            .then(res =>{
                if(res.data.success){
                    setfilePath(res.data.url)
                }else{
                    alert('비디오 업로드를 실패했습니다.');
                }
            })
    }

    const onSubmit = (e) =>{
        // e.preventDefault();

        // const variables = {
        //     writer: ,
        //     title: ,
        //     description: ,
        //     privacy: ,
        //     filePath: ,
        //     category: ,
        // }

        // axios.post('/api/video/uploadVideo', variables)

    }

  return (
    <div style={{maxWidth:'700px', margin:'2rem auto'}}>
        <div style={{textAlign:'center', marginBottom:'2rem'}}>
            <Title level={2}>Upload Video</Title>
        </div>

        <Form onSubmit={onSubmit}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                {/*Drop zone*/}
                <Dropzone 
                    onDrop={onDrop}
                    multiple={false}
                    maxSize={100000000}
                >
                    {({getRootProps, getInputProps}) =>(
                        <div style={{
                                width:'300px', 
                                height:'240px', 
                                border:'1px solid lightgray', 
                                display:'flex',
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <Icon type='plus' style={{fontSize:'3rem'}}></Icon>
                        </div> 
                    )}
                </Dropzone>
                {/*Thumbnail*/}
                <div>
                    <img />
                </div>
            </div>
            <br/>
            <br/>
            <label>Title</label>
            <Input 
                onChange={onTitleChange}
                value={videoTitle}
            />
            <br/>
            <br/>
            <label>Description</label>
            <TextArea 
                onChange={onDescriptionChange}
                value={description}
            />
            <br/>
            <br/>

            <select onChange={onPrivateChange}>
                {privateOptions.map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>
                ))}
            </select>

            <br/>
            <br/>

            <select onChange={onCategoryChange}>
                {categoryOptions.map((item, index)=>(
                    <option key={index} value={item.value}>{item.label}</option>
                ))}
            </select>

            <br/>
            <br/>

            <Button type="primary" size='large' onClick={onSubmit}>
                Submit
            </Button>
        </Form>

    </div>
  )
}

export default VideoUploadPage;