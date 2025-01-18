
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  CalendarDaysIcon,
  CaptionsIcon,
  CircleDollarSignIcon,
  FolderPenIcon,
  Image,
  NotebookPenIcon,
  User,
} from "lucide-react";
import { imageUpload } from "../../../api/utils";
import useRole from "../../../hooks/useRole";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const BuyerAddTask = () => {
  const [userInfo,,refetch] = useRole()
  const {user} = useAuth()
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm();
   const axiosSecure = useAxiosSecure()
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (taskData) => {
      await axiosSecure.post(`/tasks/${user?.email}`, taskData);
    },
    onSuccess: () => {
      toast.success(
        "Your task has been added successfully!"
      );
      
    },
    onError: () => {
      toast.error(
        "Please try again or check your inputs."
      );
    },
  });

  const onSubmit = async(data) => {
    const {task_title,task_image,task_detail,submission_info,
      required_workers,payable_amount,deadline
    } = data
    const totalPayableAmount = required_workers * payable_amount
    if(parseInt(totalPayableAmount) > parseInt(userInfo?.coins)){
      toast.error("Not Enough Coin")
      return
    }

    const image = task_image[0];
    const task_image_url = await imageUpload(image); 
    const buyer = {email: user?.email,name:user?.displayName}
    const task= {task_title,task_image_url,task_detail,submission_info,required_workers,payable_amount,deadline, buyer}  
    await mutateAsync(task);
    refetch()
  };

  return (
    <div className="bg-gradient-to-t to-brand-primary/20 from-surface p-8 rounded-lg shadow-lg w-full max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Task</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Task Title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center text-white">
              <CaptionsIcon className="mr-2" /> Task Title
            </span>
          </label>
          <input
            type="text"
            placeholder="Enter Task Title"
            className="input input-bordered w-full bg-surface text-text-light placeholder:text-text-muted text-sm"
            {...register("task_title", { required: "Task title is required" })}
          />
          {errors.task_title && (
            <p className="text-red-500 text-sm mt-1">{errors.task_title.message}</p>
          )}
        </div>

        {/* Required Workers */}
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center text-white">
              <User className="mr-2" /> Required Workers
            </span>
          </label>
          <input
            type="number"
            placeholder="Enter Required Workers"
            className="input input-bordered w-full bg-surface text-text-light placeholder:text-text-muted text-sm"
            {...register("required_workers", {
              required: "Required workers is required",
              valueAsNumber: true,
              min: { value: 1, message: "Workers must be at least 1" },
            })}
          />
          {errors.required_workers && (
            <p className="text-red-500 text-sm mt-1">{errors.required_workers.message}</p>
          )}
        </div>

        {/* Payable Amount */}
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center text-white">
              <CircleDollarSignIcon className="mr-2" /> Payable Amount
            </span>
          </label>
          <input
            type="number"
            placeholder="Enter Payable Amount"
            className="input input-bordered w-full bg-surface text-text-light placeholder:text-text-muted text-sm"
            {...register("payable_amount", {
              required: "Payable amount is required",
              valueAsNumber: true,
              min: { value: 1, message: "Payable amount must be at least 1" },
            })}
          />
          {errors.payable_amount && (
            <p className="text-red-500 text-sm mt-1">{errors.payable_amount.message}</p>
          )}
        </div>

        {/* Deadline */}
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center text-white">
              <CalendarDaysIcon className="mr-2" /> Deadline
            </span>
          </label>
          <Controller
            name="deadline"
            control={control}
            defaultValue={new Date()}
            render={({ field }) => (
              <DatePicker
                className="select select-bordered w-fit"
                selected={field.value}
                onChange={(date) => field.onChange(date)}
              />
            )}
          />
        </div>

        {/* Submission Info */}
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center text-white">
              <FolderPenIcon className="mr-2" /> Submission Info
            </span>
          </label>
          <input
            type="text"
            placeholder="Enter What to Submit"
            className="input input-bordered w-full bg-surface text-text-light placeholder:text-text-muted text-sm"
            {...register("submission_info", { required: "Submission info is required" })}
          />
          {errors.submission_info && (
            <p className="text-red-500 text-sm mt-1">{errors.submission_info.message}</p>
          )}
        </div>

        {/* Task Image */}
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center text-white">
              <Image className="mr-2" /> Task Image
            </span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full bg-surface text-text-light placeholder:text-text-muted text-sm"
            {...register("task_image",{ required: "Image is required" })}
          />
          {errors?.task_image && (
            <p className="text-red-500 text-sm mt-1">{errors.task_image.message}</p>
          )}
        </div>

        {/* Task Details */}
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center text-white">
              <NotebookPenIcon className="mr-2" /> Task Details
            </span>
          </label>
          <textarea
            placeholder="Enter Task Details"
            className="textarea textarea-bordered w-full bg-surface text-text-light placeholder:text-text-muted text-sm"
            rows={4}
            {...register("task_detail", { required: "Task details are required" })}
          ></textarea>
          {errors?.task_detail && (
            <p className="text-red-500 text-sm mt-1">{errors.task_detail.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button
            type="submit"
            disabled={isPending}
            className="btn bg-brand-primary text-gray-900 w-full mt-2 hover:bg-brand-primary/80 outline-none border-none font-semibold"
          >
            {isPending?"Adding":"Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BuyerAddTask;
