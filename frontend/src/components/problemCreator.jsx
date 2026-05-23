import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosClient from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { PlusCircle, X } from "lucide-react";

const problemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  tags: z.enum(["array","linkedList","stack","queue","deque","hashMap","set",
  "heap","priorityQueue","tree","binaryTree","binarySearchTree",
  "trie","graph","matrix","string"]),
  difficulty: z.enum(["easy", "medium", "hard"]),
  visibleTestCases: z.array(
    z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().min(1, "Explanation is required"),
    })
  ),
  hiddenTestCases: z.array(
    z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
    })
  ),
  startCode: z.array(
    z.object({
      language: z.string().min(1, "Language is required"),
      initialCode: z.string().min(1, "Initial code is required"),
    })
  ),
  referenceSolution: z.array(
    z.object({
      language: z.string().min(1, "Language is required"),
      completeCode: z.string().min(1, "Complete code is required"),
    })
  ),
});

export function ProblemCreator() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
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

  const {
    fields: visibleFields,
    append: appendVisible,
    remove: removeVisible,
  } = useFieldArray({ control, name: "visibleTestCases" });

  const {
    fields: hiddenFields,
    append: appendHidden,
    remove: removeHidden,
  } = useFieldArray({ control, name: "hiddenTestCases" });

  const {
    fields: startCodeFields,
    append: appendStartCode,
    remove: removeStartCode,
  } = useFieldArray({ control, name: "startCode" });

  const {
    fields: referenceFields,
    append: appendReference,
    remove: removeReference,
  } = useFieldArray({ control, name: "referenceSolution" });

  const onSubmit = async (data) => {
    try {
      await axiosClient.post("/problem/create", data);
      alert("Problem successfully created!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error creating problem: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 placeholder-gray-600 ">
      {/* Basic Info Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              {...register("title")}
              placeholder="e.g., Two Sum"
              className="w-full text-gray-600 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("description")}
              rows={6}
              placeholder="Problem description..."
              className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {/* Tags and Difficulty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tag <span className="text-red-500">*</span>
              </label>
              <select
                {...register("tags")}
                className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select a tag</option>
<option value="string">String</option>
<option value="array">Array</option>
<option value="linkedList">Linked List</option>
<option value="stack">Stack</option>
<option value="queue">Queue</option>
<option value="deque">Deque</option>
<option value="hashMap">Hash Map</option>
<option value="set">Set</option>

<option value="heap">Heap</option>
<option value="priorityQueue">Priority Queue</option>

<option value="tree">Tree</option>
<option value="binaryTree">Binary Tree</option>
<option value="binarySearchTree">Binary Search Tree</option>

<option value="trie">Trie</option>
<option value="graph">Graph</option>
<option value="matrix">Matrix</option>
              </select>
              {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty <span className="text-red-500">*</span>
              </label>
              <select
                {...register("difficulty")}
                className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              {errors.difficulty && <p className="text-red-500 text-sm mt-1">{errors.difficulty.message}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Visible Test Cases Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Visible Test Cases</h2>
          <button
            type="button"
            onClick={() => appendVisible({ input: "", output: "", explanation: "" })}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-green-600 hover:text-green-700 transition"
          >
            <PlusCircle size={18} />
            Add Test Case
          </button>
        </div>
        <div className="space-y-4">
          {visibleFields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 rounded-lg p-4 relative">
              <button
                type="button"
                onClick={() => removeVisible(index)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
              >
                <X size={18} />
              </button>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Input</label>
                  <textarea
                    {...register(`visibleTestCases.${index}.input`)}
                    rows={2}
                    className="w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  {errors.visibleTestCases?.[index]?.input && (
                    <p className="text-red-500 text-sm mt-1">{errors.visibleTestCases[index].input.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Output</label>
                  <textarea
                    {...register(`visibleTestCases.${index}.output`)}
                    rows={2}
                    className="w-full text-gray-600 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  {errors.visibleTestCases?.[index]?.output && (
                    <p className="text-red-500  text-sm mt-1">{errors.visibleTestCases[index].output.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Explanation</label>
                  <input
                    {...register(`visibleTestCases.${index}.explanation`)}
                    className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  {errors.visibleTestCases?.[index]?.explanation && (
                    <p className="text-red-500 text-sm mt-1">{errors.visibleTestCases[index].explanation.message}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hidden Test Cases Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Hidden Test Cases</h2>
          <button
            type="button"
            onClick={() => appendHidden({ input: "", output: "" })}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-green-600 hover:text-green-700 transition"
          >
            <PlusCircle size={18} />
            Add Test Case
          </button>
        </div>
        <div className="space-y-4">
          {hiddenFields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 rounded-lg p-4 relative">
              <button
                type="button"
                onClick={() => removeHidden(index)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
              >
                <X size={18} />
              </button>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Input</label>
                  <textarea
                    {...register(`hiddenTestCases.${index}.input`)}
                    rows={2}
                    className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  {errors.hiddenTestCases?.[index]?.input && (
                    <p className="text-red-500 text-sm mt-1">{errors.hiddenTestCases[index].input.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Output</label>
                  <textarea
                    {...register(`hiddenTestCases.${index}.output`)}
                    rows={2}
                    className="w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  {errors.hiddenTestCases?.[index]?.output && (
                    <p className="text-red-500 text-sm mt-1">{errors.hiddenTestCases[index].output.message}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Start Code Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Start Code Snippets</h2>
          <button
            type="button"
            onClick={() => appendStartCode({ language: "", initialCode: "" })}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-green-600 hover:text-green-700 transition"
          >
            <PlusCircle size={18} />
            Add Language
          </button>
        </div>
        <div className="space-y-4">
          {startCodeFields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 rounded-lg p-4 relative">
              <button
                type="button"
                onClick={() => removeStartCode(index)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
              >
                <X size={18} />
              </button>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <input
                    {...register(`startCode.${index}.language`)}
                    placeholder="e.g., Python, JavaScript, Java"
                    className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  {errors.startCode?.[index]?.language && (
                    <p className="text-red-500 text-sm mt-1">{errors.startCode[index].language.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Initial Code</label>
                  <textarea
                    {...register(`startCode.${index}.initialCode`)}
                    rows={4}
                    className="w-full px-3 text-gray-600 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  {errors.startCode?.[index]?.initialCode && (
                    <p className="text-red-500 text-sm mt-1">{errors.startCode[index].initialCode.message}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reference Solutions Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Reference Solutions</h2>
          <button
            type="button"
            onClick={() => appendReference({ language: "", completeCode: "" })}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-green-600 hover:text-green-700 transition"
          >
            <PlusCircle size={18} />
            Add Solution
          </button>
        </div>
        <div className="space-y-4">
          {referenceFields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 rounded-lg p-4 relative">
              <button
                type="button"
                onClick={() => removeReference(index)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
              >
                <X size={18} />
              </button>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <input
                    {...register(`referenceSolution.${index}.language`)}
                    placeholder="e.g., Python, JavaScript, Java"
                    className="w-full text-gray-600 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  {errors.referenceSolution?.[index]?.language && (
                    <p className="text-red-500 text-sm mt-1">{errors.referenceSolution[index].language.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Complete Code</label>
                  <textarea
                    {...register(`referenceSolution.${index}.completeCode`)}
                    rows={6}
                    className="w-full text-gray-600 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  {errors.referenceSolution?.[index]?.completeCode && (
                    <p className="text-red-500 text-sm mt-1">{errors.referenceSolution[index].completeCode.message}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create Problem"}
        </button>
      </div>
    </form>
  );
}