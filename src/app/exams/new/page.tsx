import CategoryCreateForm from "@/components/forms/categoryCreateForm";
import Container from "@/components/ui/container";
import Hero from "@/components/ui/hero";
import GradientImage from 'public/image/bg-gradient-1.jpg'
 
export default function ExamCreatePage() {
  return (
    <>
    <Hero title="Create a New Category" alt="" img={GradientImage} description="" />
      <Container full={false} narrow={true}>
        <CategoryCreateForm />
      </Container>
    </>
  );
}
