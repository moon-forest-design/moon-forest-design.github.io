'use strict';

// レシピのデータ
// ・データは「料理名、食材、調理手順」で構成。
const data = [
    {
      name: "Baked Salmon",
      ingredients: [
        { name: "Salmon", amount: 1, measurement: "l lb" },
        { name: "Pine Nuts", amount: 1, measurement: "cup" },
        { name: "Butter Lettuce", amount: 2, measurement: "cups" },
        { name: "Yellow Squash", amount: 1, measurement: "med" },
        { name: "Olive Oil", amount: 0.5, measurement: "cup" },
        { name: "Garlic", amount: 3, measurement: "cloves" },
      ],
      steps: [
        "Preheat the oven to 350 degrees.",
        "Spread the olive oil around a glass baking dish.",
        "Add the salmon, garlic, and pine nuts to the dish.",
        "Bake for 15 minutes.",
        "Add the yellow squash and put back in the oven for 30 mins.",
        "Remove from oven and let cool for 15 minutes. Add the lettuce and serve.",
      ],
    },
    {
      name: "Fish Tacos",
      ingredients: [
        { name: "Whitefish", amount: 1, measurement: "l lb" },
        { name: "Cheese", amount: 1, measurement: "cup" },
        { name: "Iceberg Lettuce", amount: 2, measurement: "cups" },
        { name: "Tomatoes", amount: 2, measurement: "large" },
        { name: "Tortillas", amount: 3, measurement: "med" },
      ],
      steps: [
        "Cook the fish on the grill until hot.",
        "Place the fish on the 3 tortillas.",
        "Top them with lettuce, tomatoes, and cheese",
      ],
    },
];

// 個々のレシピを表示
// ・nameはid属性値にも使用
// ・ingredientsを、Array.mapで処理。ulリスト表示
// ・stepsを、Array.mapで処理。olリスト表示
const Recipe = ({ name, ingredients, steps }) => (
<section id={name.toLowerCase().replace(/ /g, "-")}>
    <h1>{name}</h1>
    <ul className="ingredients">
        {ingredients.map((ingredient, i) => (
            <li key={i}>{ingredient.name}</li>
        ))}
    </ul>
    <section className="instructions">
        <h2>Cooking Instructions</h2>
        <ol>
            {steps.map((step, i) => (
                <li key={i}>{step}</li>
            ))}
        </ol>
    </section>
</section>
);

// Delicious Recipes（本体）を表示
// ・配列data（recipes）を、Array.mapで処理。関数Recipeを実行
const Menu = ({ title, recipes }) => (
<article>
    <header>
        <h1>{title}</h1>
    </header>
    <div className="recipes">
        {recipes.map((recipe, i) => (
            <Recipe key={i} {...recipe} />
        ))}
    </div>
</article>
);

// React描画
// ・関数Menuの実行時に、タイトル「Delicious Recipes」と配列data（レシピのデータ）を引数として渡す
ReactDOM.render(
    <Menu recipes={data} title="Delicious Recipes" />,
    document.getElementById("root")
);
