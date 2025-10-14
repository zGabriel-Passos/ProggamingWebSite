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
    categoria = input("Categoria de linguagem do pdf: (Ex: html, css..) ").lower()
    time.sleep(0.5)
    imagem = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWNCIOzCTMHDgisT277c7K_HheShHKJc1XbQ&s"

    lista.append(
        {
            "titulo": titulo,
            "imagem": imagem,
            "category": categoria,
        }
    )

    with open(data, "w", encoding="utf-8") as arquivo:
        print("Escrevendo o json")
        json.dump(lista, arquivo, indent=4, ensure_ascii=False)

    print(f"Você adicionou o pdf de titulo {titulo} da categoria {categoria}.")


main()
