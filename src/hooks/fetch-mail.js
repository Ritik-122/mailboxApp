import axios from 'axios'


export default function fetchMail(url,myfun) {
   async function fetchData(){
       const res=await axios.get(url)
       
       myfun(res)

   }
   return fetchData


}

