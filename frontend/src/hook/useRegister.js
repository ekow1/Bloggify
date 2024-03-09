
import {useState} from 'react'
import {useAuthContext} from "./useAuthContext.js";

   export  const useRegister = () => {
       const [error, setError] = useState(null);
       const [isLoading, setIsLoading] = useState(null);
       const {dispatch} = useAuthContext()
       const register = async (formData) => {

           // setting loading and error state
           setIsLoading(true);
           setError(null)

           // making post request
       const response = await fetch('http://localhost:5000/api/users/register', {
           method: 'POST',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify(formData),
       })
           const data = await response.json();

           if (!response.ok) {
               setIsLoading(false)
               setError(data.error)
           }

           // save user to local storage for persistence
           if (response.ok){
               localStorage.setItem('user' , JSON.stringify(data));
               dispatch({type: 'LOGIN' , payload: data })
           }
       }

       return {register, isLoading ,error}

   }