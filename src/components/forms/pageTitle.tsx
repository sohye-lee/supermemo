interface PageTitleProps {
    title: string;
    addClass?: string;
    [key:string]: any
}

export default function PageTitle({title, addClass}:PageTitleProps) {
    return (
        <h1 className={`text-2xl font-semibold text-center   ${addClass}`}>
            {title}
        </h1>
    )
}