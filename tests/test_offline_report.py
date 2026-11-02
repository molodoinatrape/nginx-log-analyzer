import json
import re
from pathlib import Path

from log_analyzer import render_report


def test_report_preserves_url_as_data_and_uses_local_script() -> None:
    template = Path(__file__).resolve().parents[1] / "templates" / "report.html"
    url = '</script><img src=x onerror="alert(1)">'

    html = render_report(template, [{"url": url, "count": 1}])

    assert url not in html
    match = re.search(
        r'<script id="report-data" type="application/json">(.*?)</script>',
        html,
        re.DOTALL,
    )
    assert match is not None
    assert json.loads(match.group(1)) == [{"url": url, "count": 1}]
    assert '<script src="report.js" defer></script>' in html
    assert not re.search(r'<script[^>]+src="https?://', html)
