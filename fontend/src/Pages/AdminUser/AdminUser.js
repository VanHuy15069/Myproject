import classNames from 'classnames/bind';
import styles from './AdminUser.module.scss';
import TitleAdmin from '~/components/TitleAdmin/TitleAdmin';
import { faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { userImg } from '~/Images';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BoxDelete from '~/components/BoxDelete/BoxDelete';
import BoxMSG from '~/components/BoxMSG/BoxMSG';
const cx = classNames.bind(styles);
function AdminUser() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [showMSG, setShowMSG] = useState(false);
    const [reTender, setReRender] = useState(false);
    const [msg, setMsg] = useState('');
    const [showBoxDelete, setShowBoxDelete] = useState(false);
    const [id, setId] = useState();
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/user/getAll')
            .then((res) => setUsers(res.data.response))
            .catch(() => navigate('/error'));
    }, [navigate, reTender]);
    useEffect(() => {
        let timer;
        if (showMSG) {
            timer = setTimeout(() => {
                setShowMSG(false);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [showMSG]);
    const handleShowDelete = (id) => {
        setId(id);
        setShowBoxDelete(true);
    };
    const handleDelete = () => {
        axios
            .delete(`http://localhost:4000/api/user/${id}`)
            .then(() => {
                setShowBoxDelete(false);
                setShowMSG(true);
                setMsg('Xóa thành công');
                setReRender(!reTender);
            })
            .catch(() => navigate('/error'));
    };
    return (
        <div className={cx('wrapper')}>
            <TitleAdmin title={'Danh sách người dùng'} icon={faUser} />
            <div className={cx('data-table')}>
                <table className={cx('table')}>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Avata</td>
                            <td>Tên người dùng</td>
                            <td>Email</td>
                            <td>Thao tác</td>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{user.id}</td>
                                    <td>
                                        <img
                                            className={cx('img')}
                                            src={user.image ? `http://localhost:4000/src/${user.image}` : userImg}
                                            alt=""
                                        />
                                    </td>
                                    <td>
                                        <div className={cx('col-name')}>
                                            <div className={cx('name')}>{user.fullName}</div>
                                            {user.vip && <div className={cx('vip')}>premium</div>}
                                        </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button
                                            className={cx('btn', 'btn-delete')}
                                            onClick={() => handleShowDelete(user.id)}
                                        >
                                            <span className={cx('icon')}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </span>
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {showMSG && (
                <div className={cx('msg')} onClick={() => setShowMSG(false)}>
                    <BoxMSG>{msg}</BoxMSG>
                </div>
            )}
            {showBoxDelete && (
                <BoxDelete
                    msg={'Xác nhận xóa người dùng này'}
                    onClickCancle={() => setShowBoxDelete(false)}
                    onClickOK={handleDelete}
                />
            )}
        </div>
    );
}
export default AdminUser;
