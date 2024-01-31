import { useForm } from 'react-hook-form';

export default function FeedbackForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return <form action="" className="w-full flex flex-col gap-3">
    
  </form>;
}
