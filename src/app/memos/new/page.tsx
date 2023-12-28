import MemoCreateForm from "@/components/forms/memoCreateForm";
import PageTitle from "@/components/forms/pageTitle";
import Container from "@/components/ui/container";
import Hero from "@/components/ui/hero";
import GradientImage from 'public/image/bg-gradient-1.jpg'
 
export default function ExamCreatePage() {
  return (
    <div className="pt-16">
    {/* <Hero title="Create a New SuperMemo" alt="" img={GradientImage} description="" /> */}
      <Container full={false} narrow={true}>
        <PageTitle title="Create a Memo" addClass="mb-4"/>
        <MemoCreateForm />
      </Container>
    </div>
  );
}
