interface CustomErrorInterface extends Error {
    status: number;
    message: string;
  }
  
  class CustomError extends Error implements CustomErrorInterface {
    status: number;
    message: string;
  
    constructor(message: string, status: number) {
      super(message);
      this.status = status;
      this.message = message;
    }
  }
  
export default CustomError;