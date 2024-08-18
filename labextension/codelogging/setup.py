__import__("setuptools").setup(
    author="Your Name",
    author_email="your.email@example.com",
    description="A custom JupyterLab backend extension",
    keywords="jupyter server extension",  # keywords 필드를 설정
)


###from setuptools import setup, find_packages
###
###setup(
###    name="codelogging",  # 패키지 이름
###    version="0.1",
###    packages=find_packages(),
###    install_requires=[
###        #'notebook',  # JupyterLab과 호환되는 패키지
###        'jupyter_server',  # Jupyter Server와 호환되는 패키지
###    ],
###    entry_points={
###        #'jupyter.serverextension': [
###        #    'my_extension = my_extension'
###        #]
###        'jupyter_serverproxy_servers': [
###            'codelogging = codelogging:load_jupyter_server_extension'
###        ]
###    },
###    # 추가 메타데이터
###    author="Your Name",
###    author_email="your.email@example.com",
###    description="A custom JupyterLab backend extension",
###    url="https://example.com/my_custom_package",
###    keywords="jupyter server extension",  # keywords 필드를 설정
###)
