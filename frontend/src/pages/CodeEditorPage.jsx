import { useParams } from 'react-router-dom';
import CodeEditorLayout from '../components/editor/CodeEditorLayout';

const CodeEditorPage = () => {
  const { id,contestId } = useParams();
  console.log("id",id);
  return <div className='min-w-[95%] min-h-screen'>
    <CodeEditorLayout problemId={id} contestId={contestId}  />
  </div> ;
};

export default CodeEditorPage;