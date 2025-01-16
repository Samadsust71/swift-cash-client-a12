// eslint-disable-next-line react/prop-types
const WorkerTasklistCard = ({task}) => {
    const {
        _id,
        task_title,
        task_image_url,task_detail,submission_info,
        required_workers,
        payable_amount,deadline,buyer} = task || {}
  return (
    <div className="card bg-base-100 w-full shadow-xl">
      <figure className="px-10 pt-10">
        <img
          src={task_image_url}
          alt={task_title}
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{task_title}</h2>
        <p>{task_detail?.slice(0,70)}...</p>
        <div className="card-actions">
          <button className="btn">Details</button>
        </div>
      </div>
    </div>
  );
};

export default WorkerTasklistCard;
