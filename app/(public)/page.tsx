import { getMe } from "@/service/getMe";


export default async function HomePage() {
const user = await getMe();
console.log("user", user);
  return (
    <div>Hello Nextjs</div>
  );
}
