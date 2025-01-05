type Links = {
    title: string;
    url: string;
};

type ColumnLinks = {
    links: Links[];
};

type Props = {
    columnLinks: ColumnLinks[];
};

export type FooterProps = React.ComponentPropsWithoutRef<"section"> &
    Partial<Props>;

export const Footer = (props: FooterProps) => {
    const { columnLinks } = {
        ...FooterDefaults,
        ...props,
    };
    return (
        <footer className="px-[5%] py-5 md:py-8 lg:py-10">
            <div className="container">
                <div className="flex flex-col items-center pb-3 md:pb-2 lg:pb-3">
                    {columnLinks.map((column, index) => (
                        <ul
                            key={index}
                            className="grid grid-flow-row grid-cols-1 items-start justify-center justify-items-center gap-6 md:grid-flow-col md:grid-cols-[max-content] md:justify-center md:justify-items-start"
                        >
                            {column.links.map((link, linkIndex) => (
                                <li key={linkIndex} className="font-semibold">
                                    <a href={link.url}>{link.title}</a>
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export const FooterDefaults: Props = {
    columnLinks: [
        {
            links: [
                {
                    title: "Arrows by Handyarrows",
                    url: "https://handyarrows.com/",
                },
            ],
        },
    ],
};
