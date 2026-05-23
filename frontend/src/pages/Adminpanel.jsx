import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosClient from "../utils/axios";
import { Navigate, useNavigate } from 'react-router';

const problemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  tags: z.enum(["Array", "linkedList", "tree", "graph"]),
  difficulty: z.enum(["easy", "medium", "high"]),
  visibleTestCases: z.array(z.object({
    input: z.string().min(1),
    output: z.string().min(1),
    explanation: z.string().min(1),
  })),
  hiddenTestCases: z.array(z.object({
    input: z.string().min(1),
    output: z.string().min(1),
  })),
  startCode: z.array(z.object({
    language: z.string().min(1),
    initialCode: z.string().min(1),
  })),
  referenceSolution: z.array(z.object({
    language: z.string().min(1),
    completeCode: z.string().min(1),
  })),
});

export function AdminPanel() {
    const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: "",
      difficulty: "",
      visibleTestCases: [],
      hiddenTestCases: [],
      startCode: [],
      referenceSolution: [],
    },
  });

  const { fields: visibleFields, append: appendVisible } = useFieldArray({ control, name: "visibleTestCases" });
  const { fields: hiddenFields, append: appendHidden } = useFieldArray({ control, name: "hiddenTestCases" });
  const { fields: startCodeFields, append: appendStartCode } = useFieldArray({ control, name: "startCode" });
  const { fields: referenceFields, append: appendReference } = useFieldArray({ control, name: "referenceSolution" });

  const onSubmit = async(data) => {
    try{
        await axiosClient.post("/problem/create",data);
        alert("problem successfully created");
        navigate("/")
    }
    catch(err){
        alert("error in creating problem" + err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-4 space-y-6">

  {/* Title */}
  <div className="form-control w-[70%] mx-auto">
    <input {...register("title")} placeholder="Title" className="input input-bordered w-full" />
    {errors.title && <p className="text-red-500">{errors.title.message}</p>}
  </div>

  {/* Description */}
  <div className="form-control w-[70%] mx-auto">
    <textarea {...register("description")} placeholder="Description" className="textarea textarea-bordered w-full" />
    {errors.description && <p className="text-red-500">{errors.description.message}</p>}
  </div>

  {/* Tags */}
  <div className="form-control w-[70%] mx-auto">
    <select {...register("tags")} className="select select-bordered w-full">
      <option value="">Select Tag</option>
      <option value="Array">Array</option>
      <option value="linkedList">Linked List</option>
      <option value="tree">Tree</option>
      <option value="graph">Graph</option>
    </select>
    {errors.tags && <p className="text-red-500">{errors.tags.message}</p>}
  </div>

  {/* Difficulty */}
  <div className="form-control w-[70%] mx-auto">
    <select {...register("difficulty")} className="select select-bordered w-full">
      <option value="">Select Difficulty</option>
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
    {errors.difficulty && <p className="text-red-500">{errors.difficulty.message}</p>}
  </div>

  {/* Visible Test Cases */}
  <div className="w-[70%] mx-auto">
    <h3 className="font-bold mb-2">Visible Test Cases</h3>
    {visibleFields.map((field, index) => (
      <div key={field.id} className="flex gap-2 mb-2">
        <input {...register(`visibleTestCases.${index}.input`)} placeholder="Input" className="input input-bordered flex-1" />
        <input {...register(`visibleTestCases.${index}.output`)} placeholder="Output" className="input input-bordered flex-1" />
        <input {...register(`visibleTestCases.${index}.explanation`)} placeholder="Explanation" className="input input-bordered flex-1" />
      </div>
    ))}
    <button type="button" onClick={() => appendVisible({ input: "", output: "", explanation: "" })} className="btn btn-sm">+ Add</button>
  </div>

  {/* Hidden Test Cases */}
  <div className="w-[70%] mx-auto">
    <h3 className="font-bold mb-2">Hidden Test Cases</h3>
    {hiddenFields.map((field, index) => (
      <div key={field.id} className="flex gap-2 mb-2">
        <input {...register(`hiddenTestCases.${index}.input`)} placeholder="Input" className="input input-bordered flex-1" />
        <input {...register(`hiddenTestCases.${index}.output`)} placeholder="Output" className="input input-bordered flex-1" />
      </div>
    ))}
    <button type="button" onClick={() => appendHidden({ input: "", output: "" })} className="btn btn-sm">+ Add</button>
  </div>

  {/* Start Code */}
  <div className="w-[70%] mx-auto">
    <h3 className="font-bold mb-2">Start Code</h3>
    {startCodeFields.map((field, index) => (
      <div key={field.id} className="space-y-2">
        <input {...register(`startCode.${index}.language`)} placeholder="Language" className="input input-bordered w-full" />
        <textarea {...register(`startCode.${index}.initialCode`)} placeholder="Initial Code" className="textarea textarea-bordered w-full" />
      </div>
    ))}
    <button type="button" onClick={() => appendStartCode({ language: "", initialCode: "" })} className="btn btn-sm">+ Add</button>
  </div>

  {/* Reference Solutions */}
  <div className="w-[70%] mx-auto">
    <h3 className="font-bold mb-2">Reference Solutions</h3>
    {referenceFields.map((field, index) => (
      <div key={field.id} className="space-y-2">
        <input {...register(`referenceSolution.${index}.language`)} placeholder="Language" className="input input-bordered w-full" />
        <textarea {...register(`referenceSolution.${index}.completeCode`)} placeholder="Complete Code" className="textarea textarea-bordered w-full" />
      </div>
    ))}
    <button type="button" onClick={() => appendReference({ language: "", completeCode: "" })} className="btn btn-sm">+ Add</button>
  </div>

  {/* Submit Button */}
  <div className="w-[70%] mx-auto">
    <button type="submit" className="btn btn-primary w-full">Create Problem</button>
  </div>

</form>
  );
}
