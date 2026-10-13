import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import { AuthUserContext } from "../../Context/AuthContextApi";
import { useNavigate } from "react-router-dom";
import Spinner from "../../Helper/Spinner";

const AddProfilePhoto = () => {


  let navigate = useNavigate();
  let {authUser} = useContext(AuthUserContext) 
  let [photoFile, setPhotoFile] = useState("");
  let [photoPreview, setPhotoPreview] = useState(null);

  let [isLoading, setIsLoading] = useState(false)

  let handleInputChange = (e) => {
    let files = e.target.files[0];
    setPhotoFile(files)
    // console.log(files);
    // URL.createObject.URL(file)
    setPhotoPreview(URL.createObjectURL(files));
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    try {
      if(!photoFile){
        toast.error("Please select a file before uploading");
        return;
      }
      //converting image into binary data
      //formData() => API
      let fileData = new FormData();
      fileData.append("file", photoFile);
      fileData.append("upload_preset", "music-application");
      fileData.append("cloud_name", "dijgihlao")

      //upload your binary data to the cloudinary
      let response = await fetch("https://api.cloudinary.com/v1_1/dijgihlao/image/upload",{
        method: "POST",
        body: fileData
      }); 

      let result = await response.json();
      let imageUrl = result.url;

      //update profile
      await updateProfile(authUser,{
        photoURL: imageUrl
      })
      toast.success("Photo Uploaded sucessfully");
      navigate("/user/profile");
    } catch (error) {
      toast.error(error.message)
      console.log("Error while uploading:",error)
      setIsLoading(false);
    }
    
  };

  return (
    <section className="w-[100%] h-[calc(100vh-70px)] flex justify-center items-center flex-col">
      <div className=' flex justify-center items-center flex-col h-[500px] w-[600px] bg-[#505050]/70 rounded-lg '>
      <article className='w-[50%] flex justify-center items-center flex-col rounded-md '>
        <header className='w-full'>
          <h1 className='text-3xl text-center font-bold uppercase py-3'>Upload profile photo</h1>
        </header>
        {photoPreview===null?<>
        <div className='w-[150px] h-[150px] border rounded-full flex justify-center items-center '>
          no file selected
        </div></>:<>
        <img src={photoPreview} className='w-[150px] h-[150px] border rounded-full flex justify-center items-center ' alt="" /></>}
      </article>
      <main className='w-[35%] flex justify-center items-center'>
          <form action="" onSubmit={handleSubmit}>
            <div className='flex flex-col justify-center  my-3'>
              <label htmlFor="profile" className=' font-semibold text-lg py-2 text-center ' >Upload Your Profile Photo:</label>
              <input type="file" name='photoFile' id='profile' onChange={handleInputChange} className='border text-white rounded py-2 px-4 border-[#636363] file:bg-white file:text-black file:p-1 file:rounded  file:cursor-pointer cursor-pointer' />
            </div>
            <div className='flex justify-center items-center'>
              <button className='py-2 px-2 mt-5 mb-5 bg-[#575757] hover:scale-110 transition-all cursor-pointer text-lg font-semibold rounded-lg'>Upload Profile</button>
            </div>
          </form>
      </main>
      </div>
      {isLoading && (<section className="w-full h-[100vh] bg-black/50 fixed top-0">
          <Spinner/>
        </section>)}
    </section>
  );
};

export default AddProfilePhoto;
