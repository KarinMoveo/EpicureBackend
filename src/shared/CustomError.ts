interface CustomErrorInterface extends Error {
    statusCode: number;
    status: string;
  }
  
  class CustomError extends Error implements CustomErrorInterface {
    statusCode: number;
    status: string;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
    }
  }
  
export default CustomError;