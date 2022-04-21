import { useState, useEffect, useCallback } from 'react';
import {Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import mainbg from '../../resourses/img/mainbg.png';
import GlassLines from '../glassLines/glassLines';
import Spinner from '../spinner/spinner';
import useMarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import ErrorText from '../errorText/ErrorText';
import './charAppDescr.scss';


const CharAppDescr = (props) => {
    const [char, setChar] = useState(null);

    const {getCharacter, loading, error} = useMarvelService();


    useEffect(()=> {
        if(props.onCharId !== undefined) {
            onUpdateChar()
        }
    }, [props.onCharId])
        

    const onUpdateChar =() => {
        
        const onCharId = props.onCharId;

        getCharacter(onCharId)
            .then(onLoadCharInfo)
    }

    const onLoadCharInfo = (res) => {
        setChar(res)
    }

       const skeleton = char || loading ? null : <Skeleton/>;
       const content = !(loading || !char) ? <View char={char}/> : null;
       const spinnerView = loading ? <Spinner/> : null;
       const errorText = error ? <ErrorText/> : null;
       const findChar = !char || !loading ? <FindChar/> : null;
    return (
        <div className="charApp__descr">
            {skeleton}
            {content}
            {spinnerView}
            {errorText}
            {findChar}
            <img src={mainbg} alt="mainbg" className="mainbg"/>
        </div>
        )
}

const FindChar = () => {
    const [charName, setCharName] = useState(false);
    const [charNotName, setCharNotName] = useState(false);

    const {getFullNameChar, loading, clearError} = useMarvelService();

    const getNameChar = useCallback(async (name)=> {
        clearError()
        setCharName(false)
        setCharNotName(false)
        const allName = await getFullNameChar(name);

        if(allName.data.results.length) {
            setCharNotName(false)
            setCharName(allName)
        } else {
            setCharName(false)
            setCharNotName(true)
        }
    },[])

    const onDelete = () => {
        setCharName(false)
        setCharNotName(false)
    }
    

        const nameFound = charName ? <CharFouned charName={charName}/> : null;
        const nameNotFound = charNotName ? <CharNotFound/> : null;
        const load = loading ? <GlassLines/> : null;
    return (
        <>
            <Formik
             initialValues = {{name:''}}
             validationSchema = {Yup.object({name: Yup.string().required("Это обязательное поле")})}
             onSubmit={(values)=>getNameChar(values.name)}
             >
                <div className='findChar'>
                    <div className="container">
                        <p>Or find a character by name:</p>
                        <Form className='findChar__form'>
                            <MyTextField onInput={()=>onDelete()} placeholder='Enter name' className='findChar__input' name = 'name' type="text"/>
                        </Form>
                        {nameFound}
                        {nameNotFound}
                        {load}
                    </div>
                </div>
            </Formik>
        </>
    )
}

const MyTextField = (props) => {
    const [field, meta] =useField(props);
    return (
        <>
        <input {...field} {...props} />
        <button href ="#" type="submit" className="button button__main">
            <div className="inner">Find</div>
        </button>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
        </>
    )
}

const CharFouned = ({charName}) => {
    console.log(charName)
    const detailLink = charName.data.results[0].urls[0].url;
    return (
        <>
          <div className='charname'>
            <p className='charname__p' >There is! Visit page?</p>
            <button  className="button button__secondary">
                <div  className="inner">
                    <a href ={detailLink} rel="noreferrer" target="_blank">TO PAGE</a>
                </div>
            </button>
          </div>  
        </>
    )
}

const CharNotFound = () => {
    return (
        <>
            <p className='charnotfound' >The character was not found. Check the name and try again</p>
        </>
    )
}




const View = ({char}) => {
    const {name, thumbnail, description, stories, wiki, homepage } = char;
    
        return (
            <>
            <div className="charAppCard">
                    <div className="charApp__descr_head">
                        <img src={thumbnail} alt="loki" className="lokiImg"/>
                        <div className="charApp__descr_head_link">
                            <h3 className="charApp__item_title">
                                {name}
                            </h3>
                            <div className="button button__main">
                                <div className="inner">LOAD MORE</div>
                               <a href={homepage}> </a>
                            </div>
                            <div href={wiki} className="button button__secondary">
                                <div className="inner">WIKI</div>
                                <a href={wiki}> </a>
                            </div>
                        </div>
                    </div>
                    <p>{description}</p>
                    <span>Comics:</span>
                    <div className='charApp__inner'>
                        {
                           stories.map((res, i) => {
                                return (
                                    <div className="charApp__descr_link" key={i}>
                                        {res.name}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        )
        
}

export default CharAppDescr;