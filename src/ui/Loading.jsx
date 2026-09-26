import './loading.css'

function Loading({ count = 6 }) {
    return (
        <div className="skeleton-grid">
            {Array.from({ length: count }).map((_, index) => (
                <div className="skeleton-card" key={index}>
                    
                    <div className="skeleton-image"></div>

                    <div className="skeleton-content">
                        <div className="skeleton-title"></div>
                        <div className="skeleton-text"></div>
                        <div className="skeleton-text short"></div>

                        <div className="skeleton-bottom">
                            <div className="skeleton-price"></div>
                            <div className="skeleton-button"></div>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    );
}

export default Loading;