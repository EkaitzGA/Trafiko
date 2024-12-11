function Form({onSubmit}) {
    return (
        <form onSubmit={onSubmit}>
            <select type="text" name="carretera">
                <option value="A-1">A-1</option>
                <option value="A-132">A-132</option>
                <option value="A-636">A-636</option> 
                <option value="A-8">A-8</option>
                <option value="AP-1">AP-1</option>
                <option value="AP-68">AP-68</option>
                <option value="BI-604">BI-604</option>
                <option value="BI-625">BI-625</option>
                <option value="BI-631">BI-631</option>
                <option value="BI-636">BI-636</option>
                <option value="BI-637">BI-637</option>
                <option value="GI-20">GI-20</option>
                <option value="GI-636">GI-636</option>
                <option value="N-I">N-I</option>
                <option value="N-102">N-102</option>
                <option value="N-240">N-240</option>
                <option value="N-622">N-622</option>
                <option value="N-634">N-634</option>
                <option value="N-637">N-637</option>
                <option value="N-644">N-644</option>
            </select>

            <select type="text" name="territorio">
                <option value="Bizkaia">Bizkaia</option>
                <option value="Gipuzkoa">Gipuzkoa</option>
                <option value="Araba">Araba</option>
            </select>
            <input type="text" name="municipio" />
            <button type="submit">Buscar</button>
        </form>
    )
}

export default Form