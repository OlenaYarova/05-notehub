import { ThreeDots } from 'react-loader-spinner'

    
export default function Loader(){
    return (
        <div>
 <ThreeDots
  height="80"
  width="80"
  radius="9"
  color="#4fa94d"
  ariaLabel="three-dots-loading"
  wrapperStyle={{ margin: '20px' }}
  wrapperClass="custom-loader"
  visible={true}
/>
 </div>
    );
    }
