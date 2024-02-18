'use client';
import Image from "next/image";
import React from 'react';

export default function Home() {

  const handleClick = () => {
    //TODO: Redirect to the quiz page
    alert('Going to the quiz page');
  };

  return (
    <main className="static font-[Helvetica_World] tracking-wide">
      <Image className="z-2 object-cover"
        src="/blob.svg"
        alt="Blue Element"
        fill={true}
      />
      <Image className="z-4 object-cover"
        src="/chatting.svg"
        alt="Blue Element"
        fill={true}
      />
      <Image className="z-4 fixed top-0 left-0 pt-2 pl-4 flex" //Kinda wonky
        src="/logo.svg"  
        alt="Logo"
        width = {100}
        height = {100}
      />
      <div className="z-6 fixed top-40 left-40 pt-20 pr-4 flex flex-col items-left justify-between">
        <div className="flex flex-row ">
          <h1 className="text-[#0063E2] text-6xl"> dialogix </h1> 
          <h1 className="text-[#0063E2] text-6xl font-bold"> AI </h1>
        </div>
        <h2 className="text-[#0063E2] text-3xl mt-2">
          Speak. Learn. Connect. 
        </h2>
        <p className="text-lg pt-8">
        Get feedback on your
        </p>
        <div className="flex flex-row text-lg">
          <p className="font-bold">pronunciation</p>
          <p>&nbsp;and&nbsp;</p>
          <p className="font-bold">expression</p>
        </div>
        <button onClick={handleClick} className="group transition duration-300 bg-[#0063E2] hover:bg-[#324781] text-lg text-white mt-10 p-2 rounded-md">
          Let's start {""}
          <span className="inline-block transition-transform group-hover:translate-x-3 motion-reduce:transform-none">
              -&gt;
          </span>
        </button>
        
      </div>

      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      </div>
    </main>
  );
}
