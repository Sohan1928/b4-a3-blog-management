import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { adminServices } from "./admin.service";

const blockTheUser = catchAsync(async (req, res) => {
  await adminServices.blockTheUser(req.params.userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User is blocked successfully",
  });
});

const deleteBlogByAdmin = catchAsync(async (req, res) => {
  await adminServices.deleteBlogByAdmin(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Blog is deleted successfully",
  });
});

export const AdminControllers = {
  blockTheUser,
  deleteBlogByAdmin,
};
