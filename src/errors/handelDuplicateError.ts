
export const handelDuplicateError = (error:any)=>{
   let message = error?.errorResponse?.errmsg
  let errorMessages;
  errorMessages =[
    {
        path:'',
        message:error?.errorResponse?.errmsg
    }
  ]

  return{
    message,
    errorMessages
  };
}