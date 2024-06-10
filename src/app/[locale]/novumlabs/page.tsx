import * as React from "react";

type ImageProps = {
  src: string;
  alt: string;
  className: string;
};

type ArticleBlockProps = {
  content: string;
};

type TextBlockProps = {
  title: string;
  content: string;
};

const Image: React.FC<ImageProps> = ({ src, alt, className }) => (
  <img loading="lazy" src={src} alt={alt} className={className} />
);

const ArticleBlock: React.FC<ArticleBlockProps> = ({ content }) => (
  <article className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
    <p className="text-2xl text-zinc-500 max-md:mt-10">{content}</p>
  </article>
);

const TextBlock: React.FC<TextBlockProps> = ({ title, content }) => (
  <section className="mt-20 text-2xl text-white max-md:mt-10 max-md:max-w-full">
    <h2>{title}</h2>
    <p>{content}</p>
  </section>
);

const MyComponent: React.FC = () => {
  const articleContents = [
    "Wang realized that the disk did not emit light. It only reflected the light from the real sun, which was on the other side of the sky, below the horizon. What had risen wasn’t a sun at all, but a giant moon. The giant moon moved briskly up the sky at a pace that could be detected by the naked eye. In the process, it gradually waned from a full to a half moon, and then a crescent. The old man’s soothing violin strains drifted on the cold morning breeze. The majestic sight of the universe was like the music made material. Wang was intoxicated.",
    "The great pyramid that had appeared the first four times had been destroyed by the tri-solar syzygy. In its place was a tall, modern building, whose dark gray shape was familiar to Wang: the United Nations Headquarters. In the distance were many more tall buildings, apparently dehydratories. All had completely reflective mirror surfaces. In the dawn light they appeared as giant crystal plants growing out of the ground.",
    "From where he stood on a small hill, Wang could see no end to the sea of people. He estimated the number of individuals within his view alone to be in the hundreds of millions. All the Trisolarans on the planet were probably gathered here. The silence of hundreds of millions created a suffocating sense of strangeness. What are they waiting for? Wang looked around and noticed everyone was gazing up at the sky.",
  ];

  return (
    <div className="flex flex-col justify-center bg-white">
      <header className="flex flex-col items-center px-5 w-full bg-black max-md:max-w-full">
        <Image src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d014042ca53493abe24c7390c9805baa43e77d04cf6dcb54d0aa6dc8c740187?apiKey=850a133bc12d4240a604c29278f81477&" alt="" className="self-stretch w-full aspect-[1.79] max-md:max-w-full" />
        <TextBlock
          title=""
          content="Once his eyes had grown used to the sight, Wang could see that the faint red background was indeed pulsing. The entire sky flickered, as if the universe was but a quivering lamp in the wind. Standing under the flashing dome of the night sky, Wang suddenly felt the universe shrink until it was so small that only he was imprisoned in it. The universe was a cramped heart, and the red light that suffused everything was the translucent blood that filled the organ. Suspended in the blood, he saw that the flickering of the red light was not periodic—the pulsing was irregular. He felt a strange, perverse, immense presence that could never be understood by human intellect."
        />
        <div className="flex gap-5 mt-48 text-4xl font-bold text-white max-md:flex-wrap max-md:mt-10">
          <div className="flex-auto max-md:max-w-full">
            Genesis Collection: Kingpin Compound.
          </div>
          <Image src="https://cdn.builder.io/api/v1/image/assets/TEMP/db3f8a42adb2cca748ceebcbc25f4a094ac8c042470fe8f70929e2795b74d012?apiKey=850a133bc12d4240a604c29278f81477&" alt="" className="shrink-0 self-start aspect-[0.78] fill-white w-[29px]" />
        </div>
      </header>

      <main>
        <TextBlock
          title=""
          content="Another sixty thousand Trisolaran hours went by. Twenty thousand Trisolaran hours after the completion of the huge particle accelerator in space, the unfolding of the proton into two dimensions was about to begin in a synchronous orbit around Trisolaris. It was a beautiful and mild Stable Era day. The sky was particularly clear. Like the day when the fleet had set sail eighty thousand Trisolaran hours ago, the entire population of Trisolaris looked up into the sky, gazing at that giant ring. The princeps and all the consuls again came and stood under the Pendulum Monument. The pendulum had long stopped, and the weight hung still like a solid rock between the tall pillars. Looking at it, it was hard to believe that it had once moved."
        />
        <section className="mt-24 max-w-full w-[1280px] max-md:mt-10">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            {Array(3)
              .fill("https://cdn.builder.io/api/v1/image/assets/TEMP/0ca58921590f3fa412201cd5962e76607c6f4224504ec4fae56fc532d35fd92d?apiKey=850a133bc12d4240a604c29278f81477&")
              .map((src, index) => (
                <div key={index} className="flex flex-col grow max-md:mt-10">
                  <Image src={src} alt="" className="w-full aspect-[1.33]" />
                  <div className="shrink-0 h-3 bg-orange-500" />
                </div>
              ))}
          </div>
        </section>

        <section className="flex gap-5 items-start mt-11 max-w-full text-5xl text-white w-[1196px] max-md:flex-wrap max-md:mt-10 max-md:text-4xl">
          {["Trisolaris: The Listener", "The Frontiers of Science", "The Shooter and the Farmer"].map((title, index) => (
            <div key={index} className="flex-auto max-md:text-4xl">
              {title}
            </div>
          ))}
        </section>

        <section className="mt-11 max-w-full w-[1278px] max-md:mt-10">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            {articleContents.map((content, index) => (
              <ArticleBlock key={index} content={content} />
            ))}
          </div>
        </section>

        <section className="mt-24 max-w-full w-[1280px] max-md:mt-10">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            {Array(3)
              .fill("https://cdn.builder.io/api/v1/image/assets/TEMP/0ca58921590f3fa412201cd5962e76607c6f4224504ec4fae56fc532d35fd92d?apiKey=850a133bc12d4240a604c29278f81477&")
              .map((src, index) => (
                <div key={index} className="flex flex-col grow max-md:mt-10">
                  <Image src={src} alt="" className="w-full aspect-[1.33]" />
                  <div className="shrink-0 h-3 bg-orange-500" />
                </div>
              ))}
          </div>
        </section>

        <section className="flex gap-5 items-start mt-11 max-w-full text-5xl text-white w-[1196px] max-md:flex-wrap max-md:mt-10 max-md:text-4xl">
          {["Trisolaris: The Listener", "The Frontiers of Science", "The Shooter and the Farmer"].map((title, index) => (
            <div key={index} className={`flex-auto ${index === 0 ? "border border-black border-solid" : ""} max-md:text-4xl`}>
              {title.includes("Science") ? <><span className="font-bold">{title}</span></> : <>{title}</>}
            </div>
          ))}
        </section>

        <section className="mt-11 max-w-full w-[1278px] max-md:mt-10">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            {articleContents.map((content, index) => (
              <ArticleBlock key={index} content={content} />
            ))}
          </div>
        </section>
      </main>

      <footer className="flex overflow-hidden relative flex-col justify-center self-stretch px-11 py-20 mt-32 w-full min-h-[300px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <Image src="https://cdn.builder.io/api/v1/image/assets/TEMP/1b7834323291346b560f1b28cd81ab839335a591905695b2a24bf73d76bd99cf?apiKey=850a133bc12d4240a604c29278f81477&" alt="" className="object-cover absolute inset-0 size-full" />
        <div className="flex relative gap-5 items-center mt-10 mb-4 w-full max-md:flex-wrap max-md:max-w-full">
          <Image src="https://cdn.builder.io/api/v1/image/assets/TEMP/5943583ccad3634fc680faa72fa3283014fc70c5a4d0bac37b395ccdf3b5ff74?apiKey=850a133bc12d4240a604c29278f81477&" alt="" className="shrink-0 self-stretch max-w-full aspect-[4.55] w-[278px]" />
          <div className="flex gap-1.5 self-stretch my-auto">
            <Image src="https://cdn.builder.io/api/v1/image/assets/TEMP/4e8aa0a60707f5f208fb881533d062da45fdb5cd0180a54a1f1f17df06adc6ff?apiKey=850a133bc12d4240a604c29278f81477&" alt="" className="shrink-0 w-24 aspect-[3.85]" />
            <Image src="https://cdn.builder.io/api/v1/image/assets/TEMP/4f453a578c0334bbed459b150abd8b1671021bb4ae54118ce9c9d33e933c007c?apiKey=850a133bc12d4240a604c29278f81477&" alt="" className="shrink-0 max-w-full aspect-[4.76] w-[117px]" />
          </div>
          <div className="flex-auto self-stretch my-auto text-xl text-neutral-400">
            © 2022 NovumLabs.com
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MyComponent;