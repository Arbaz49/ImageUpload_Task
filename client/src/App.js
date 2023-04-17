import { useState } from 'react';
import './App.css';
import axios from 'axios';
import LoadingBar from 'react-top-loading-bar';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const[image,setImage]=useState({});
  const[uploaded,setUploaded]=useState([])
  const [progress, setProgress] = useState(0)
  const handleChange=(e)=>{
    setImage(e.target.files[0])
  
  }
  const submit=async()=>{
    setProgress(30)
    const  a=new FormData();
    a.append("myfile",image)
try{
const {data}=await axios.post("http://localhost:8000",a,{
  headers:{"content-type": "multipart/form-data"}
})
setProgress(90)
toast.success(data.message)
console.log(data)
setUploaded([...uploaded,data.data.url]);
setProgress(100)
}catch(e){
console.log(e)
}
  }
  return (
    <div className="App">
      <ToastContainer
position="top-right"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />
        <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
  <input type="file" name="myfile" onChange={(e)=>handleChange(e)} />
  <button onClick={submit}>submit</button>

  <div>
    <h3>uploaded</h3>
    <div style={{display:"flex",gap:"20px",flexWrap:"wrap",width:"80%",margin:"auto"}} >
    {
      uploaded?.map((url,i)=>{
        return (
            <img key={i} src={url} alt={url} width={"250px"} height={"250px"} />
            )
          })
        }
        </div>
  </div>
    </div>
  );
}

export default App;
