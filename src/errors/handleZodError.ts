import { ZodError } from "zod";

export const handleZodError = (error: ZodError) => {
  let message = "";
  let errorMessages;
  error?.issues?.forEach(
    (singleError) => (message += `${singleError?.message}. `)
  );
  errorMessages = error?.issues?.map((item) => {
    return {
      path: item?.path[1],
      message: item.message,
    };
  });
  return {
    message,
    errorMessages,
  };
};
