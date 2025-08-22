export default function InfoBanner({ error, info, search }) {
    return (
        <div className="col-12">
            <div
                className="d-flex flex-column justify-content-center align-items-center p-5 border rounded empty-box"
                style={{ minHeight: "200px" }}
            >
                <h4>{error}</h4>
                {info && <p>{info}{search && <strong> {search}</strong>}</p>}
            </div>
        </div>
    )
}