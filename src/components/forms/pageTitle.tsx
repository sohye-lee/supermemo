interface PageTitleProps {
    title: string;
    addClass?: string;
    [key:string]: any
}

export default function PageTitle({title, addClass}:PageTitleProps) {
    return (
        <h1 className={`text-xl font-semibold text-center ${addClass}`} style={{fontFamily: 'Inter, sans-serif'}}>
            {title}
        </h1>
    )
}