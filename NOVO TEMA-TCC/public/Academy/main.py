import time
import json


def main():
    data = "data.json"
    lista = []

    try:
        with open(data, "r", encoding="utf-8") as arquivo_leitura:
            lista = json.load(arquivo_leitura)
    except (IOError, json.JSONDecodeError):
        pass

    titulo = input("Titulo do pdf: ")
    time.sleep(0.5)
    categoria = input(
        "Categoria de linguagem do pdf - (Ex: html, css, js, outros): "
    ).lower()
    time.sleep(0.5)
    url = input("Coloque o caminho do pdf que esta na pasta do Academy: ")
    time.sleep(0.5)
    imagem = f"bg-{categoria}.png"

    lista.append(
        {
            "titulo": titulo,
            "imagem": imagem,
            "category": categoria,
            "link": url,
            "by": "Oficial Proggaming",
        }
    )

    with open(data, "w", encoding="utf-8") as arquivo:
        print("Escrevendo o json")
        json.dump(lista, arquivo, indent=4, ensure_ascii=False)

    print(f"Você adicionou o pdf de titulo {titulo} da categoria {categoria}.")


main()
