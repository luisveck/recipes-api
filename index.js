const express = require('express')

const data = require('./recipes.json')

const PORT = process.env.PORT || 3000
const app = express()



app.listen(PORT, () => {
    console.log('Listening on port '+PORT)
})
app.get('/recipes/:id', (req,res) => {
    const { id } = req.params
  
    const recipe = data.find(({ id: recipeId }) => parseInt(id, 10) === recipeId)
    console.log('data', recipe)
    if (!recipe) {
        return res.status(404).send('Not found')
    }
    res.json(recipe)
})

app.get('/recipes', (req,res) => {
    const { search } = req.query
    let resData = data 
    if (search) {

        resData = data.filter(({ name }) => {
            return name.toLowerCase().includes(search.toLowerCase())
        })
    }
    console.log(search)
    res.json(resData)
})



