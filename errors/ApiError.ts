class ApiError extends Error {
    constructor(public readonly status: number, public readonly message: string) {
      super();
    }
  
    static badRequest(res: any, errorMessage: { message: string; friendlyMsg?: string }) {
      return res.status(400).json({
        message: errorMessage.message,
        friendlyMsg: errorMessage.friendlyMsg,
      });
    }
  
    static validationError(res: any, errorMessage: { message: string; friendlyMsg?: string }) {
      return res.status(422).json({
        message: errorMessage.message,
        friendlyMsg: errorMessage.friendlyMsg,
      });
    }
  
    static unauthorized(res: any, errorMessage: { message: string; friendlyMsg?: string }) {
      return res.status(401).json({
        message: errorMessage.message,
        friendlyMsg: errorMessage.friendlyMsg,
      });
    }
  
    static forbidden(res: any, errorMessage: { message: string; friendlyMsg?: string }) {
      return res.status(403).json({
        message: errorMessage.message,
        friendlyMsg: errorMessage.friendlyMsg,
      });
    }
  
    static notFound(res: any, errorMessage: { message: string; friendlyMsg?: string }) {
      return res.status(404).json({
        message: errorMessage.message,
        friendlyMsg: errorMessage.friendlyMsg,
      });
    }
  
    static internal(res: any, errorMessage: { message: string; friendlyMsg?: string }) {
      console.log(errorMessage.message);
      return res.status(500).json({
        friendlyMsg: errorMessage.friendlyMsg,
      });
    }
  }
  
  export = ApiError;
  