import { Response } from "express";

const handleError = (err: any, res: Response) => {
  console.log("internal server error");
  console.log(err);
  res.status(500).json({
    success: false,
    message: "internal server error",
  });
};

export { handleError };
