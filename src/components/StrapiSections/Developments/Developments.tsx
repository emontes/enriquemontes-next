import { HeadingText } from "../../HeadingText";
import DevelopmentCard from "@/components/DevelopmentCard/DevelopmentCard";
import { getLocale } from "next-intl/server";

const Developments = async ({ Heading, developments }) => {
    if (!developments || !developments.data || developments.data.length === 0) {
        return <div>No developments available.</div>;
    }
    const locale = await getLocale();
    return (
        <div className="relative py-16 bg-gradient-radial from-cyan-950 to-cyan-700 clip-path-diagonal">
            {Heading && (
                <HeadingText
                    attributes={{
                        id: "DevelopmentsBlock",
                        className: "text-white mb-8 text-center",
                    }}
                    HeadingText={Heading.HeadingText}
                    HeadingType={Heading.HeadingType}
                />
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto px-4">
                {developments.data.map((develop) => (
                    <DevelopmentCard
                        key={develop.id}
                        development={develop}
                        locale={locale}
                        showResourceLinks={true}
                        resources={develop.attributes.resources?.data || []}
                    />
                ))}
            </div>
        </div>
    );
};

export default Developments;
