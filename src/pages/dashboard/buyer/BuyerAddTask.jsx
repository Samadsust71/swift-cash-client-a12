
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  CalendarDaysIcon,
  FolderPenIcon,
  Images,
  NotebookPenIcon,
  SaladIcon,
} from "lucide-react";
import { imageUpload } from "../../../api/utils";

const BuyerAddTask = () => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    const {task_title,task_image,task_detail,submission_info,
      required_workers,payable_amount,deadline
    } = data

    const image = task_image[0];
    
    const task_image_url = await imageUpload(image);
    console.log(task_image_url);
    // Handle form submission logic here
    
  };

  return (
    <div className="bg-gradient-to-t to-brand-primary/20 from-surface p-8 rounded-lg shadow-lg w-full max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Task</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Task Title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center">
              <FolderPenIcon className="mr-2" /> Task Title
            </span>
          </label>
          <input
            type="text"
            placeholder="Enter Task Title"
            className="input input-bordered"
            {...register("task_title", { required: "Task title is required" })}
          />
          {errors.task_title && (
            <p className="text-red-500 text-sm mt-1">{errors.task_title.message}</p>
          )}
        </div>

        {/* Required Workers */}
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center">
              <SaladIcon className="mr-2" /> Required Workers
            </span>
          </label>
          <input
            type="number"
            placeholder="Enter Required Workers"
            className="input input-bordered"
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
            <span className="label-text flex items-center">
              <Images className="mr-2" /> Payable Amount
            </span>
          </label>
          <input
            type="number"
            placeholder="Enter Payable Amount"
            className="input input-bordered"
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
            <span className="label-text flex items-center">
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
            <span className="label-text flex items-center">
              <NotebookPenIcon className="mr-2" /> Submission Info
            </span>
          </label>
          <input
            type="text"
            placeholder="Enter What to Submit"
            className="input input-bordered"
            {...register("submission_info", { required: "Submission info is required" })}
          />
          {errors.submission_info && (
            <p className="text-red-500 text-sm mt-1">{errors.submission_info.message}</p>
          )}
        </div>

        {/* Task Image */}
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center">
              <NotebookPenIcon className="mr-2" /> Task Image
            </span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            {...register("task_image")}
          />
        </div>

        {/* Task Details */}
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center">
              <NotebookPenIcon className="mr-2" /> Task Details
            </span>
          </label>
          <textarea
            placeholder="Enter Task Details"
            className="textarea textarea-bordered h-24"
            {...register("task_detail", { required: "Task details are required" })}
          ></textarea>
          {errors.task_detail && (
            <p className="text-red-500 text-sm mt-1">{errors.task_detail.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn bg-primary-bg hover:bg-primary-bg/70 text-white"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default BuyerAddTask;
