import { useForm } from "react-hook-form";

const AddJobs = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  console.log(watch("example"));
  return (
    <div>
      <h3 className="font-inter text-3xl font-semibold">Add a new job ad</h3>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input defaultValue="test" {...register("example")} />
          <input {...register("exampleRequired", { required: true })} />
          {errors.exampleRequired && <span>This field is required</span>}

          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AddJobs;
