const Title = ({ title }) => {
	return (
		<div className="mb-16 text-center">
			<h2 className="bg-gradient-to-r from-primary-7 to-primary-1 text-transparent bg-clip-text inline-block tracking-wider transition-all duration-200 hover:transform hover:skew-y-2 hover:skew-x-5 hover:scale-110 hover:shadow-[0.5rem_1rem_2rem_rgba(0,37,92,0.2)] animate-moveInRight">
				{title || "Default Title"}
			</h2>
			<div className="underline" />
		</div>
	);
};

export default Title;
