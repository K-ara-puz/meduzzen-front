"use client";
import { CompaniesMockData } from "../../interfaces/companies.mock.interface";
import { companies } from "../../mockData";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  let companiesDivs = companies.map((el: CompaniesMockData) => (
    <div key={el.id} className="bg-slate-600 mb-2 px-2">
      Name: {el.name}, city: {el.city}
      <button
        onClick={() => goToProfile(el.id)}
        className="bg-green-500 p-1 ml-2"
      >
        Go to profile
      </button>
    </div>
  ));

  const goToProfile = (id: number) => {
    router.push(`/companies/${id}`);
  };

  return (
    <div>
      <h1 className="text-3xl">Companies!</h1>
      <br></br>
      {companiesDivs}
    </div>
  );
}
