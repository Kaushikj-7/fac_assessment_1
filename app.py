import streamlit as st
import streamlit.components.v1 as components
from pathlib import Path

# Set full-wide layout & custom browser tab metadata
st.set_page_config(
    page_title="Arrakis Finance — Onchain Market Making",
    page_icon="⚡",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS to integrate Streamlit UI seamlessly with the Obsidian template theme
st.markdown("""
    <style>
    /* Remove default Streamlit top padding and main container padding */
    .block-container {
        padding-top: 0rem !important;
        padding-bottom: 0rem !important;
        padding-left: 0rem !important;
        padding-right: 0rem !important;
        max-width: 100% !important;
    }
    
    /* Hide top Streamlit header bar & footer decoration */
    header[data-testid="stHeader"] {
        background: transparent !important;
        z-index: 99999 !important;
    }
    
    footer {
        visibility: hidden !important;
    }
    
    /* Dark glassmorphism styling for Streamlit Sidebar */
    section[data-testid="stSidebar"] {
        background-color: #080a0f !important;
        border-right: 1px solid rgba(255, 255, 255, 0.08) !important;
    }
    
    /* Custom sidebar headers and text */
    section[data-testid="stSidebar"] .stMarkdown h1, 
    section[data-testid="stSidebar"] .stMarkdown h2, 
    section[data-testid="stSidebar"] .stMarkdown h3 {
        color: #f59e0b !important;
        font-family: 'Plus Jakarta Sans', sans-serif !important;
    }

    /* Style sidebar buttons */
    .stButton > button {
        width: 100%;
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
        color: #000000 !important;
        font-weight: 700 !important;
        border: none !important;
        border-radius: 8px !important;
        padding: 0.5rem 1rem !important;
        transition: all 0.3s ease !important;
    }
    .stButton > button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);
    }
    </style>
""", unsafe_allow_html=True)

# Define Base Path
BASE_DIR = Path(__file__).parent

@st.cache_data(show_spinner=False)
def load_template_assets():
    """Load core static template assets from disk."""
    html_path = BASE_DIR / "index.html"
    css_path = BASE_DIR / "styles.css"
    three_js_path = BASE_DIR / "three.min.js"
    script_js_path = BASE_DIR / "script.js"

    html_content = html_path.read_text(encoding="utf-8") if html_path.exists() else ""
    css_content = css_path.read_text(encoding="utf-8") if css_path.exists() else ""
    three_js_content = three_js_path.read_text(encoding="utf-8") if three_js_path.exists() else ""
    script_js_content = script_js_path.read_text(encoding="utf-8") if script_js_path.exists() else ""

    return html_content, css_content, three_js_content, script_js_content

html_raw, css_raw, three_js_raw, script_js_raw = load_template_assets()

# Sidebar Controls
with st.sidebar:
    st.image("https://img.icons8.com/isometric-line/96/amber/crystal.png", width=54)
    st.title("Arrakis Controls")
    st.caption("Live Streamlit Controls & WebGL Physics Studio")
    
    st.divider()
    
    st.subheader("🎨 Theme & Aesthetics")
    accent_color = st.color_picker("Primary Accent Tint", "#f59e0b")
    wave_speed = st.slider("3D Wave Motion Speed", min_value=0.1, max_value=2.0, value=0.45, step=0.05)
    enable_glow = st.toggle("Enable Cursor Spotlight Glow", value=True)
    iframe_height = st.number_input("Viewport Height (px)", min_value=600, max_value=3000, value=1400, step=100)

    st.divider()

    st.subheader("📊 Onchain Metrics State")
    tvl_stat = st.text_input("Total Value Locked (TVL)", "$2.4B+")
    vol_stat = st.text_input("24h Volume", "$485M+")
    chains_stat = st.text_input("Active Chains", "8 Networks")

    st.divider()

    st.subheader("🚀 Deployment Ready")
    st.info("Deployed via Streamlit Components v1. Fully offline-ready with Three.js WebGL water shaders.")

    with st.expander("☁️ Cloud Deployment Guide"):
        st.markdown("""
        **Deploy to Streamlit Community Cloud:**
        1. Push repository to GitHub.
        2. Visit [share.streamlit.io](https://share.streamlit.io).
        3. Select `app.py` as entry point.
        4. Click **Deploy**!
        """)

# Dynamic Asset Customization Logic
custom_css = css_raw
if accent_color != "#f59e0b":
    custom_css = custom_css.replace("#f59e0b", accent_color)

if not enable_glow:
    custom_css += "\n.cursor-glow { display: none !important; }\n"

custom_script = script_js_raw
if wave_speed != 0.45:
    custom_script = custom_script.replace(
        "const t = elapsedTime * 0.45;",
        f"const t = elapsedTime * {wave_speed};"
    )

# Replace remote/relative tags with full inline bundled source
bundled_html = html_raw
bundled_html = bundled_html.replace(
    '<link rel="stylesheet" href="styles.css">',
    f'<style>\n{custom_css}\n</style>'
)

bundled_html = bundled_html.replace(
    '<script src="three.min.js"></script>',
    f'<script>\n{three_js_raw}\n</script>'
)

bundled_html = bundled_html.replace(
    '<script src="script.js"></script>',
    f'<script>\n{custom_script}\n</script>'
)

# Render complete responsive WebGL HTML template inside Streamlit
components.html(bundled_html, height=iframe_height, scrolling=True)
