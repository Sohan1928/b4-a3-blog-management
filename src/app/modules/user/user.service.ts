// import { IUser } from "./user.interface";
// import { User } from "./user.model";

// const createUserIntoDB = async (payload: IUser) => {
//   const result = await User.create(payload);
//   return result;
// };

// const getAllUsersFromDB = async () => {
//   const result = await User.find();
//   return result;
// };

// const getSingleUserFromDB = async (id: string) => {
//   const result = await User.findById(id);
//   return result;
// };

// const updateStudentIntoDB = async (id: string, payload: Partial<IUser>) => {
//   const result = await User.findOneAndUpdate({ _id: id }, payload, {
//     new: true,
//   });
//   return result;
// };

// export const UserServices = {
//   createUserIntoDB,
//   getAllUsersFromDB,
//   getSingleUserFromDB,
//   updateStudentIntoDB,
// };
